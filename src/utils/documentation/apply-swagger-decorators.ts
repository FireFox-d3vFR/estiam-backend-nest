import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { createUserSwagger, updateUserSwagger } from './users.swagger';

export function ApplyCreateUserSwagger() {
  return applyDecorators(
    ApiOperation(createUserSwagger.operation),
    ApiResponse(createUserSwagger.responses['201']),
    ApiResponse(createUserSwagger.responses['400']),
    ApiResponse(createUserSwagger.responses['401']),
    ApiBody(createUserSwagger.body),
  );
}

export function ApplyUpdateUserSwagger() {
  return applyDecorators(
    ApiOperation(updateUserSwagger.operation),
    ApiResponse(updateUserSwagger.responses['200']),
    ApiResponse(updateUserSwagger.responses['400']),
    ApiResponse(updateUserSwagger.responses['404']),
    ApiResponse(updateUserSwagger.responses['401']),
    ApiBody(updateUserSwagger.body),
  );
}
