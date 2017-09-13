package by.allneed.aktor

import akka.actor.{Actor, ActorRef, ActorRefFactory, ActorSystem, Props}
import akka.io.IO
import akka.pattern.ask
import akka.util.Timeout
import by.allneed.aktor.message.log.LogInfoMessage
import by.allneed.persistence.Db
import org.slf4j.LoggerFactory
import spray.can.Http
import spray.http.MediaTypes._
import spray.http._
import spray.httpx.RequestBuilding._
import spray.routing._
import spray.routing.directives.OnCompleteFutureMagnet

import scala.concurrent.{Await, ExecutionContextExecutor, Future}
import scala.concurrent.duration._
import scala.util.{Failure, Success}

class AppServiceActor
  extends Actor
    with AppServiceRoutes
    with NoteServiceRoutes {

  private val logger = LoggerFactory.getLogger(getClass)

  import scala.concurrent.ExecutionContext.Implicits.global

  override def actorRefFactory: ActorRefFactory = context

  override def postStop(): Unit = {
    Await.ready(Db.db.shutdown, Duration.Inf)
    logger.info("Database has stopped")
  }

  def receive: Receive = runRoute(
    appRoutes ~
      noteRoutes
  )

}

trait AppServiceRoutes extends HttpService {

  private lazy val logger: ActorRef = actorRefFactory.actorOf(Props[LogActor], "app-service-route")

  private implicit val system: ActorSystem = ActorSystem()

  private implicit def executor: ExecutionContextExecutor = system.dispatcher

  private implicit val timeout: Timeout = Timeout(1.minute)

  val host = "api.openweathermap.org/data/2.5/weather"
  val appid: String = "8c73ddda43c41df0f2f43160b102f055"

  val appRoutes: Route =
    path("api" / "weather") {
      get {
        parameter('city) { city =>
          val url = s"http://$host?q=$city&appid=$appid&units=metric"
          logger ! LogInfoMessage(s"url: $url")
          val responseFuture: Future[HttpResponse] = (IO(Http) ? Get(url)).mapTo[HttpResponse]
          val responseValueFuture: Future[String] = responseFuture map {
            _.entity.data.asString
          }
          respondWithMediaType(`application/json`) {
            onComplete(OnCompleteFutureMagnet(responseValueFuture)) {
              case Success(response) => complete(response)
              case Failure(error) => complete(s"An error occured during request exectuin. A message: ${error.getMessage}")
            }
          }
        }
      }
    } ~ path("") {
      getFromResource("webapp/index.html", `text/html`)
    } ~ {
      getFromResourceDirectory("webapp")
    }

}