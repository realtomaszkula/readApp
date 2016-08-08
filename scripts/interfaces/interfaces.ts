/// <reference path="../../typings/jquery.d.ts" />

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
  length: number;
}


export interface listParams {
  parent: JQuery, 
  suggestions: string[]
}