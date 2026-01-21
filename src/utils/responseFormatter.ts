interface SuccessResponse<T> {
  success: true
  data: T
  message: string // Optional message
  statusCode?: number // Optional status code
  timestamp: string // Optional timestamp
}

interface ErrorResponse<E = any> {
  success: false
  message: string
  error?: E // Generic error type
  statusCode?: number // Optional status code
  timestamp: string // Optional timestamp
}

export const formatSuccess = <T>(
  data: T,
  statusCode: number = 200,
  message?: string,
): SuccessResponse<T> => {
  return {
    success: true,
    data,
    statusCode,
    timestamp: new Date().toISOString(),
    message,
  }
}

export const formatError = <E = any>(
  message: string,
  error?: E,
  statusCode: number = 500,
): ErrorResponse<E> => {
  return {
    success: false,
    message,
    error,
    statusCode,
    timestamp: new Date().toISOString(),
  }
}

export const sendResponse = <T = any, E = any>(
  res: any,
  isSuccess: boolean,
  payload: T | E,
  statusCode?: number,
  message?: string,
) => {
  if (isSuccess) {
    const successResponse = formatSuccess(payload as T, statusCode, message)
    res.status(successResponse.statusCode || 200).json(successResponse)
  } else {
    const errorResponse = formatError(
      message || 'An error occurred',
      payload as E,
      statusCode,
    )
    res.status(errorResponse.statusCode || 500).json(errorResponse)
  }
}
