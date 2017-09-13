package by.allneed.aktor

import akka.actor.{ActorRef, ActorSystem, Props}
import akka.util.Timeout
import by.allneed.aktor.message.log.LogErrorMessage
import by.allneed.mapping.NoteJson._
import by.allneed.persistence.{Note, Notes}
import spray.http.{HttpResponse, StatusCode, StatusCodes}
import spray.http.MediaTypes.`application/json`
import spray.http.StatusCodes.OK
import spray.httpx.SprayJsonSupport._
import spray.routing.{HttpService, Route}
import spray.routing.directives.OnCompleteFutureMagnet

import scala.concurrent.ExecutionContextExecutor
import scala.concurrent.duration._
import scala.util.{Failure, Success}

trait NoteServiceRoutes extends HttpService {

  private lazy val logger: ActorRef = actorRefFactory.actorOf(Props[LogActor], "note-service-route")

  private implicit val system: ActorSystem = ActorSystem()

  private implicit def executor: ExecutionContextExecutor = system.dispatcher

  private implicit val timeout: Timeout = Timeout(1.minute)

  val noteRoutes: Route =
    path("api" / "notes") {
      post {
        entity(as[Note]) { note =>
          onComplete(OnCompleteFutureMagnet(Notes.insert(note)))({
            case Success(id) => complete(id.toString)
            case Failure(exception) =>
              logger ! LogErrorMessage(exception)
              reject
          })
        }
      } ~ get {
        parameter('city.as[String]) { city =>
          respondWithMediaType(`application/json`) {
            onComplete(OnCompleteFutureMagnet(Notes.findByCity(city))) {
              case Success(notes) => complete(notes)
              case Failure(exception) =>
                logger ! LogErrorMessage(exception)
                reject
            }
          }
        }
      } ~ delete {
        formField('id.as[Long]) { id =>
          onComplete(OnCompleteFutureMagnet(Notes.remove(id))) {
            case Success(affected) => complete(OK)
            case Failure(exception) =>
              logger ! LogErrorMessage(exception)
              reject
          }
        }
      }

    }

}
