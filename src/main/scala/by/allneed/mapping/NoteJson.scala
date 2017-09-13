package by.allneed.mapping

import java.sql.Timestamp
import java.time.{Instant, LocalDateTime, ZoneOffset}
import java.time.format.DateTimeFormatter
import java.time.temporal.TemporalAccessor
import java.util.Date

import by.allneed.persistence.Note
import spray.json.{DefaultJsonProtocol, JsString, JsValue, RootJsonFormat}

object NoteJson extends DefaultJsonProtocol {

  val dateTimeFormatter: DateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSSSSS")

  implicit val DateFormat: RootJsonFormat[LocalDateTime] = new RootJsonFormat[LocalDateTime] {
    override def read(dateJson: JsValue): LocalDateTime = {
      val str: String = dateJson.convertTo[String]
      println("xxxxxxxxxxxxxxxxxxxxx:" + str)
      val accessor = dateTimeFormatter.parse(str)
      println(accessor)
      LocalDateTime.from(accessor)
    }

    override def write(date: LocalDateTime): JsValue = JsString(date.format(dateTimeFormatter))
  }

  implicit val NoteFormat: RootJsonFormat[Note] = jsonFormat4(Note)

}
