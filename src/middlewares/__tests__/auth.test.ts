import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { validateRefreshToken } from '../auth'

const setupMock = () => {
  const mockRequest = { body: { refreshToken: '' } } as Request
  const mockResponse = () => {
    const res = {} as Response
    res.status = jest.fn().mockReturnValue(res)
    res.json = jest.fn().mockReturnValue(res)
    return res
  }
  const mockNext: NextFunction = jest.fn()

  return {
    req: mockRequest,
    res: mockResponse(),
    next: mockNext,
  }
}

describe('validateRefreshToken', () => {
  test('Should verify token and attach user to request', () => {
    const { req, res, next } = setupMock()
    const jwtPayload = {
      id: '6501eb940f522b662a113a7a',
      email: 'user@gmail.com',
    }

    const verify = jest.spyOn(jwt, 'verify')
    verify.mockImplementation(() => jwtPayload)

    validateRefreshToken(req, res, next)

    expect(next).toHaveBeenCalledTimes(1)
    expect(req.user).toEqual({
      _id: jwtPayload.id,
      email: jwtPayload.email,
    })

    verify.mockRestore()
  })

  test('Should throw an error for an invalid refresh token', () => {
    const { req, res, next } = setupMock()
    validateRefreshToken(req, res, next)
    expect(res.status).toHaveBeenCalledWith(401)
    expect(res.json).toHaveBeenCalledWith({ success: false, error: 'Invalid refresh token' })
    expect(next).not.toHaveBeenCalled()
  })
})
