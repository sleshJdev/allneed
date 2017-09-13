package by.allneed

import akka.actor.{ActorRef, ActorSystem, Props}
import akka.io.IO
import akka.pattern.ask
import akka.util.Timeout
import by.allneed.aktor.message.log.{LogErrorMessage, LogInfoMessage}
import by.allneed.aktor.{AppServiceActor, LogActor}
import by.allneed.persistence.Db
import spray.can.Http

import scala.concurrent.ExecutionContextExecutor
import scala.concurrent.duration._
import scala.util.{Failure, Success}

object Boot extends App {

  implicit val system: ActorSystem = ActorSystem("allneed")
  implicit val timeout: Timeout = Timeout(1.minute)
  implicit val executionContextExecutor: ExecutionContextExecutor = system.dispatcher

  val logger: ActorRef = system.actorOf(Props[LogActor], "app")

  // create and start our service actor
  val service = system.actorOf(Props[AppServiceActor], "app-service")

  // start a new HTTP server on port 8080 with our service actor as the handler
  IO(Http) ? Http.Bind(service, interface = "localhost", port = 9000)

//  Db.initialize() onComplete {
//    case Success(_) => logger ! LogInfoMessage("Database schema has been initialized")
//    case Failure(e) => logger ! LogErrorMessage(e)
//  }

  logger ! LogInfoMessage("App has started")
}
