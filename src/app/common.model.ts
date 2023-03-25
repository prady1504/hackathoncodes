
export interface IGPTResponse {
    id: string
    object?: string
    created?: number
    model?: string
    choices: IChoice[]
    usage?: IUsage
  }
  
  export interface IChoice {
    index: number
    finish_reason: string
    message: IMessage
  }
  
  export interface IMessage {
    role: string
    content: string
  }
  
  export interface IUsage {
    completion_tokens: number
    prompt_tokens: number
    total_tokens: number
  }
