package by.allneed.aktor

import by.allneed.persistence.Db
import org.specs2.mutable.Specification

import scala.concurrent.Await
import scala.concurrent.duration.Duration

class DbMigration extends Specification {

  "DbMigration" >> {
    Await.ready(Db.initialize(), Duration.Inf)
    1 must_== 1
  }

}
