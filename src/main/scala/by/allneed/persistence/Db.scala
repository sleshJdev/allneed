package by.allneed.persistence

import org.slf4j.{Logger, LoggerFactory}
import slick.basic.DatabaseConfig
import slick.jdbc.JdbcProfile

import scala.concurrent.Future


object Db {

  val logger: Logger = LoggerFactory.getLogger(getClass)

  val config = DatabaseConfig.forConfig[JdbcProfile]("allneed")
  val db = config.db
  val api = config.profile.api

  import api._

  def initialize(): Future[Unit] = {
    val schema = Notes.model.schema

    db.run(DBIO.seq(
      schema.drop,
      schema.create
    ))

  }

  def shutdown: Future[Unit] = db.shutdown

}
