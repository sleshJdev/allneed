organization  := "by.allneed"

version       := "0.1"

scalaVersion  := "2.11.6"

scalacOptions := Seq("-unchecked", "-deprecation", "-encoding", "utf8")

libraryDependencies ++= {
  val akkaV = "2.3.9"
  val sprayV = "1.3.3"
  val slickV = "3.2.1"
  Seq(
    "io.spray"            %%  "spray-can"       % sprayV,
    "io.spray"            %%  "spray-routing"   % sprayV,
    "io.spray"            %%  "spray-httpx"     % sprayV,
    "io.spray"            %%  "spray-json"      % sprayV,
    "io.spray"            %%  "spray-testkit"   % sprayV   % "test",
    "com.typesafe.akka"   %%  "akka-actor"      % akkaV,
    "com.typesafe.akka"   %%  "akka-testkit"    % akkaV    % "test",
    "org.specs2"          %%  "specs2-core"     % "2.3.11" % "test",
    "com.typesafe.slick"  %%  "slick"           % slickV,
    "com.typesafe.slick"  %%  "slick-hikaricp"  % slickV,
    "ch.qos.logback"      %   "logback-classic" % "1.2.3",
    "org.postgresql"      %   "postgresql"      % "42.0.0"
  )
}

Revolver.settings
