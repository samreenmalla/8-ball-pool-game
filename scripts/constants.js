const CONSTANTS = {

  delta: 1/180,

  //balls
  ball_params: [
    [new Vector(880,340), Color.Green],
    [new Vector(920,320), Color.Green],
    [new Vector(960,300),Color.Red],
    [new Vector(1000,280), Color.Green],
    [new Vector(1040,260), Color.Red],

    [new Vector(920,360), Color.Red],
    [new Vector(960,380), Color.Green],
    [new Vector(1000,400), Color.Red],
    [new Vector(1040,420),Color.Green],

    [new Vector(960, 338), Color.Black],
    [new Vector(1000,322), Color.Red],
    [new Vector(1000,360),Color.Green],

    [new Vector(1040,300),Color.Red],
    [new Vector(1040,340),Color.Green],
    [new Vector(1040,380),Color.Red],
    [new Vector(368,300), Color.White]
  ],
  ballpos: new Vector(25,25),
  ball_diameter: 38,
  ball_radius: 19,

  //stick
  stickpos: new Vector(969,16),
  stick_shot_pos: new Vector(950,11),
  Max_Power: 6000,

  //table
  pockets: [
    new Vector(90,90),//topLeft
    new Vector(710,92),//topMiddle
    new Vector(1224,99),//topRight
    new Vector(1224,590),//bottomRight
    new Vector(710,590),//bottomMiddle
    new Vector(90,592)//bottomLeft
  ],
  pocket_radius: 46

}