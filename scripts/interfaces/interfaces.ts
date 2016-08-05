export interface inputProperties {
  input: string,
  position: number,
  customSnippets: {}

}

export interface inputPropertiesWithSnippets extends inputProperties {
} 

export interface indexes {
  start: number,
  end: number,
}