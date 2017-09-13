package by.allneed.persistence

import java.sql.Timestamp
import java.time.LocalDateTime

import by.allneed.persistence.Db.api._
import slick.lifted.ProvenShape

import scala.concurrent.Future

case class Note(id: Option[Long], city: String, text: String, createdAt: LocalDateTime)

class NoteTable(tag: Tag) extends Table[Note](tag, "note") {

  def id = column[Long]("id", O.AutoInc, O.PrimaryKey)

  def city = column[String]("city_name", O.Length(100, varying = true))

  def text = column[String]("text")

  def createdAt = column[Timestamp]("createdAt", O.SqlType("timestamp default localtimestamp"))

  type NoteType = (Option[Long], String, String, Timestamp)

  def to: NoteType => Note = {
    case (id, city, text, createdAt) =>
      Note(id, city, text, createdAt.toLocalDateTime)
  }

  def from: Note => Option[NoteType] = {
    case  Note(id, city, text, createdAt) => Some((id, city, text, Timestamp.valueOf(createdAt)))
  }

  override def * : ProvenShape[Note] = (id.?, city, text, createdAt) <> (to, from)
}

object Notes {

  import Db.db

  val model = TableQuery[NoteTable]

  def findByCity(city: String): Future[Seq[Note]] = db.run(model.filter(_.city === city).result)

  def insert(note: Note): Future[Long] = {
    db.run(model returning model.map(_.id) += note)
  }

  def findAll(): Future[Seq[Note]] = db.run(model.result)

}