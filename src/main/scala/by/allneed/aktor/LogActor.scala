package by.allneed.aktor

import akka.actor.{Actor, ActorLogging}
import by.allneed.aktor.message.log._

class LogActor extends Actor with ActorLogging {

  override def receive: PartialFunction[Any, Unit] = {
    case LogInfoMessage(message) =>
      log.info(message);
    case LogDebugMessage(message) =>
      log.debug(message)
    case LogErrorMessage(exception) =>
      log.error(exception, exception.getMessage)
  }

}
