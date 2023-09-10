import { Request, Response } from 'express'
import { Query, Send, ParamsDictionary } from 'express-serve-static-core'

export interface IRequestBody<T> extends Request {
  body: T
}

export interface IRequestQuery<T extends Query> extends Request {
  query: T
}

export interface IRequestParams<T extends ParamsDictionary> extends Request {
  params: T
}

export interface IRequestQueryBody<T extends Query, U> extends Request {
  query: T
  body: U
}

export interface IRequestParamsBody<T extends ParamsDictionary, U> extends Request {
  params: T
  body: U
}

interface IApiResponse<T> {
  success: boolean
  error?: string
  data?: T
}

export interface IResponse<TData> extends Response {
  json: Send<IApiResponse<TData>, this>
}
