import { neutroGenaNatural, type ScenarioData } from './neutrogena-natural'
import { cucumberMint } from './cucumber-mint'
import { cucumberMint1 } from './cucumber-mint1'
import { cucumberMint2 } from './cucumber-mint2'
import { cucumberMint3 } from './cucumber-mint3'
import { cucumberMint4 } from './cucumber-mint4'
import { cucumberMint5 } from './cucumber-mint5'

// import { newScenario } from './new-product' // Uncomment when you create a new scenario

export const scenarioMap = {
  'neutrogena-natural': neutroGenaNatural,
  'cucumber-mint': cucumberMint,
  'cucumber-mint1': cucumberMint1,
  'cucumber-mint2': cucumberMint2,
  'cucumber-mint3': cucumberMint3,
  'cucumber-mint4': cucumberMint4,
  'cucumber-mint5': cucumberMint5
  // 'new-product': newScenario  // Add your new scenario here
}

export type ScenarioKey = keyof typeof scenarioMap

export type { ScenarioData }

export function getScenario(id: string) {
  return scenarioMap[id as ScenarioKey]
}
