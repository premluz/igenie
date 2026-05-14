import { neutroGenaNatural } from './neutrogena-natural'
import { cucumberMint } from './cucumber-mint'

export const scenarioMap = {
  'neutrogena-natural': neutroGenaNatural,
  'cucumber-mint': cucumberMint
}

export type ScenarioKey = keyof typeof scenarioMap

export function getScenario(id: string) {
  return scenarioMap[id as ScenarioKey]
}
