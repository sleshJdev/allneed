package by.allneed.aktor

import akka.actor.ActorSystem
import org.specs2.mutable.Specification
import spray.http.HttpEntity
import spray.http.MediaTypes.`application/json`
import spray.http.StatusCodes.OK
import spray.json.{JsObject, JsString}
import spray.testkit.Specs2RouteTest

class AppServiceSpec
  extends Specification
    with Specs2RouteTest
    with AppServiceRoutes
    with NoteServiceRoutes {

  def actorRefFactory: ActorSystem = system

  "AppService" should {

    "retrieve weather info" in {
      Get("/api/weather?city=Minsk") ~> appRoutes ~> check {
        status === OK
      }
    }

    "create a note" in {
      val note: JsObject = JsObject(
        ("city", JsString("Minsk")),
        ("text", JsString("Misk is capital of the Belarus")),
        ("createdOn", JsString("2017-09-12 12:00:00")))
      val body: HttpEntity = HttpEntity(`application/json`, note.toString())
      Post("/api/notes", body) ~> noteRoutes ~> check {
        status === OK
      }
    }
  }

}
