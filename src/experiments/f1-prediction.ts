// DATA

const Teams = [
  'Red Bull Racing Honda RBPT',
  'Mercedes',
  'Ferrari',
  'McLaren Mercedes',
  'Aston Martin Aramco Mercedes',
  'Alpine Renault',
  'Williams Mercedes',
  'RB Honda RBPT',
  'Kick Sauber Ferrari',
  'Haas Ferrari'
] as const

type Team = (typeof Teams)[number]

type DriverID = number

type Driver = {
  id: DriverID
  name: string
  nationality: string
  team: Team
  isReserve: boolean
}

type ChampionshipResult = {
  driver: DriverID
  points: number
}

type Race = {
  name: string
  location: string
  date: string
  circuit: string
}

const currentDrivers: Driver[] = [
  {
    id: 33,
    name: 'Max Verstappen',
    nationality: 'NED',
    team: 'Red Bull Racing Honda RBPT',
    isReserve: false
  },
  {
    id: 4,
    name: 'Lando Norris',
    nationality: 'GBR',
    team: 'McLaren Mercedes',
    isReserve: false
  },
  {
    id: 16,
    name: 'Charles Leclerc',
    nationality: 'MON',
    team: 'Ferrari',
    isReserve: false
  },
  {
    id: 81,
    name: 'Oscar Piastri',
    nationality: 'AUS',
    team: 'McLaren Mercedes',
    isReserve: false
  },
  {
    id: 55,
    name: 'Carlos Sainz',
    nationality: 'ESP',
    team: 'Ferrari',
    isReserve: false
  },
  {
    id: 44,
    name: 'Lewis Hamilton',
    nationality: 'GBR',
    team: 'Mercedes',
    isReserve: false
  },
  {
    id: 63,
    name: 'George Russell',
    nationality: 'GBR',
    team: 'Mercedes',
    isReserve: false
  },
  {
    id: 11,
    name: 'Sergio Perez',
    nationality: 'MEX',
    team: 'Red Bull Racing Honda RBPT',
    isReserve: false
  },
  {
    id: 14,
    name: 'Fernando Alonso',
    nationality: 'ESP',
    team: 'Aston Martin Aramco Mercedes',
    isReserve: false
  },
  {
    id: 27,
    name: 'Nico Hulkenberg',
    nationality: 'GER',
    team: 'Haas Ferrari',
    isReserve: false
  },
  {
    id: 18,
    name: 'Lance Stroll',
    nationality: 'CAN',
    team: 'Aston Martin Aramco Mercedes',
    isReserve: false
  },
  {
    id: 22,
    name: 'Yuki Tsunoda',
    nationality: 'JPN',
    team: 'RB Honda RBPT',
    isReserve: false
  },
  {
    id: 20,
    name: 'Kevin Magnussen',
    nationality: 'DEN',
    team: 'Haas Ferrari',
    isReserve: false
  },
  {
    id: 23,
    name: 'Alexander Albon',
    nationality: 'THA',
    team: 'Williams Mercedes',
    isReserve: false
  },
  {
    id: 3,
    name: 'Daniel Ricciardo',
    nationality: 'AUS',
    team: 'RB Honda RBPT',
    isReserve: true
  },
  {
    id: 10,
    name: 'Pierre Gasly',
    nationality: 'FRA',
    team: 'Alpine Renault',
    isReserve: false
  },
  {
    id: 8,
    name: 'Oliver Bearman',
    nationality: 'GBR',
    team: 'Haas Ferrari',
    isReserve: true
  },
  {
    id: 2,
    name: 'Franco Colapinto',
    nationality: 'ARG',
    team: 'Williams Mercedes',
    isReserve: false
  },
  {
    id: 31,
    name: 'Esteban Ocon',
    nationality: 'FRA',
    team: 'Alpine Renault',
    isReserve: false
  },
  {
    id: 40,
    name: 'Liam Lawson',
    nationality: 'NZL',
    team: 'RB Honda RBPT',
    isReserve: false
  },
  {
    id: 24,
    name: 'Zhou Guanyu',
    nationality: 'CHN',
    team: 'Kick Sauber Ferrari',
    isReserve: false
  },
  {
    id: 6,
    name: 'Logan Sargeant',
    nationality: 'USA',
    team: 'Williams Mercedes',
    isReserve: true
  },
  {
    id: 77,
    name: 'Valtteri Bottas',
    nationality: 'FIN',
    team: 'Kick Sauber Ferrari',
    isReserve: false
  }
]

const currentStandings: ChampionshipResult[] = [
  { driver: 33, points: 362 },
  { driver: 4, points: 315 },
  { driver: 16, points: 291 },
  { driver: 81, points: 251 },
  { driver: 55, points: 240 },
  { driver: 44, points: 189 },
  { driver: 63, points: 177 },
  { driver: 11, points: 150 },
  { driver: 14, points: 62 },
  { driver: 27, points: 31 },
  { driver: 18, points: 24 },
  { driver: 22, points: 22 },
  { driver: 20, points: 14 },
  { driver: 23, points: 12 },
  { driver: 3, points: 12 },
  { driver: 10, points: 9 },
  { driver: 8, points: 7 },
  { driver: 2, points: 5 },
  { driver: 31, points: 5 },
  { driver: 40, points: 2 },
  { driver: 24, points: 0 },
  { driver: 6, points: 0 },
  { driver: 77, points: 0 }
]

const topDrivers = currentStandings.slice(0, 3).map((entry) => {
  return currentDrivers.find((driver) => driver.id === entry.driver)!
})

const remainingRaces = [
  {
    name: 'Brazilian Grand Prix',
    location: 'Interlagos, Brazil',
    date: '2024-11-03',
    circuit: 'Autódromo José Carlos Pace'
  },
  {
    name: 'Las Vegas Grand Prix',
    location: 'Las Vegas',
    date: '2024-11-24',
    circuit: 'Las Vegas Street Circuit'
  },
  {
    name: 'Qatar Grand Prix',
    location: 'Lusail',
    date: '2024-12-01',
    circuit: 'Lusail International Circuit'
  },
  {
    name: 'Abu Dhabi Grand Prix',
    location: 'Yas Marina',
    date: '2024-12-08',
    circuit: 'Yas Marina Circuit'
  }
] as const satisfies Race[]

const pointsPerPosition = [25, 18, 15, 12, 10, 8, 6, 4, 2, 1] as const
const positions = Array.from({ length: 20 }, (_, i) => i)

// SIMULATION

// RACE RESULT MODELS
type raceModel = (drivers: Driver[]) => (Driver & { position: number })[]
const uniformProbabilityModel: raceModel = (drivers: Driver[]) => {
  const newPositions = positions.toSorted(() => Math.random() - 0.5).slice(0, 3)

  return drivers.map((driver, index) => {
    return {
      ...driver!,
      position: newPositions[index]
    }
  })
}

// FASTEST LAP MODELS
type fastestLapModel = (drivers: Driver[]) => DriverID | null
const randomFastestLap: fastestLapModel = (drivers: Driver[]) => {
  for (const driver of drivers) {
    if (Math.random() < 1 / 20) {
      return driver.id
    }
  }

  return null
}

// HELPERS
const simulateRace = (
  drivers: Driver[],
  raceModel: raceModel,
  fastestLapModel: fastestLapModel
) => {
  const raceResult = raceModel(drivers)

  type Points = {
    driverID: DriverID
    points: number
    fastestLap: boolean
  }[]
  const result: Points = []

  // Race result
  raceResult.forEach((driver, index) => {
    const points = pointsPerPosition[driver.position] || null
    if (points === null) return

    result.push({
      driverID: driver.id,
      points,
      fastestLap: false
    })
  })

  // Fastest lap
  const fastestLap = fastestLapModel(drivers)
  if (!fastestLap) return result

  const fastestLapEntry = result.find((entry) => entry.driverID === fastestLap)
  if (fastestLapEntry) {
    fastestLapEntry.fastestLap = true
  }
  return result
}

const runSimulation = (
  drivers: Driver[],
  currentStandings: ChampionshipResult[],
  raceModel: raceModel,
  fastestLapModel: fastestLapModel,
  numSimulations: number
) => {
  console.log(`> Running simulation with ${drivers.length} drivers`)

  const results = []

  // Run simulations
  for (let i = 0; i < numSimulations; i++) {
    const currentSimulation = drivers.reduce(
      (acc, driver) => {
        acc[driver.id] = 0
        return acc
      },
      {} as { [id: number]: number }
    )

    // Simulate each race
    remainingRaces.forEach(() => {
      const raceResult = simulateRace(drivers, raceModel, fastestLapModel)

      // Race result
      raceResult.forEach((entry) => {
        currentSimulation[entry.driverID] += entry.points
      })

      // Fastest lap
      const fastestLapDriver = raceResult.find((entry) => entry.fastestLap)
      if (fastestLapDriver) {
        currentSimulation[fastestLapDriver.driverID] += 1
      }
    })

    const finalStandings = Object.entries(currentSimulation)
      .map(([driverId, points]) => ({
        driver: Number(driverId),
        name: currentDrivers.find((driver) => driver.id === Number(driverId))
          ?.name,
        points:
          points +
          (currentStandings.find(
            (standing) => standing.driver === Number(driverId)
          )?.points || 0)
      }))
      .sort((a, b) => b.points - a.points)

    results.push(finalStandings)
  }

  console.log(
    `> Scheduled ${numSimulations} ${numSimulations > 1 ? 'simulations' : 'simulation'}, Completed ${results.length} ${results.length > 1 ? 'simulations' : 'simulation'}`
  )

  const driverWins = drivers.reduce(
    (acc, driver) => {
      acc[driver.id] = 0
      return acc
    },
    {} as { [id: number]: number }
  )

  results.forEach((result) => {
    driverWins[result[0].driver] += 1
  })

  Object.entries(driverWins).forEach(([driverId, wins]) => {
    const driver = currentDrivers.find((d) => d.id === Number(driverId))
    console.log(`> ${driver?.name} wins: ${wins}`)
  })
}

// RUN SIMULATION

runSimulation(
  topDrivers,
  currentStandings.splice(0, 3),
  uniformProbabilityModel,
  randomFastestLap,
  100000
)

/* Analysis
 *
 * 1. Should consider all possibilities, not arbitrary amount of simulations
 *    - First I wanted to generate all possible permutations, but this results in 20! (over 2.4 quintillion) possible outcomes for every race. This is too many to run in a reasonable amount of time, so I considered alternatives. I will now consider only the top 3 drivers, as Oscar Piastri who is currently in 4th place will not overtake the top driver (Max Verstappen) even if he wins the remaining races and gets the fastest lap each weekend.
 * 2. Should consider driver performance probability / historical data
 *    - Initially I thought to consider driver average position this season, but this would take a lot of time to collect all the data and analyze it. I decided to explore alternatives first.
 *    - The betting odds for each driver are available online, but they are heavily biased by the drivers' recent performances.
 * 3. Should consider reserve drivers for sickness/injury reasons
 */

/* Limitations
 *
 * Does not consider FIA penalties
 * - this is partially accounted for by the varying race results
 */
