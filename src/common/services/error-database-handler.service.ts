import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MongoError } from 'mongodb';

@Injectable()
export class ExceptionHandlerService {
  handleDatabaseError(error: any): HttpException {
    if (error instanceof MongoError) {
      switch (error.code) {
        case 11000: // Clave duplicada
          return new HttpException('Duplicate key error', HttpStatus.CONFLICT);
        case 121: // Documento no válido
          return new HttpException('Document validation error', HttpStatus.BAD_REQUEST);
        case 66: // Campo inmutable
          return new HttpException('Immutable field error', HttpStatus.BAD_REQUEST);
        case 50: // Timeout
          return new HttpException('Operation timed out', HttpStatus.REQUEST_TIMEOUT);
        case 2: // Error de sintaxis
          return new HttpException('Syntax error', HttpStatus.BAD_REQUEST);
        case 13: // Permiso denegado
          return new HttpException('Permission denied', HttpStatus.FORBIDDEN);
        case 11600: // Error de interrupción
          return new HttpException('Interrupted error', HttpStatus.INTERNAL_SERVER_ERROR);
        case 11601: // Error de interrupción
          return new HttpException('Interrupted at shutdown', HttpStatus.INTERNAL_SERVER_ERROR);
        case 10003: // Error de conexión
          return new HttpException('Connection error', HttpStatus.SERVICE_UNAVAILABLE);
        default: // Error interno del servidor
          return new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } else {
      // Manejo de otros errores no relacionados con MongoDB
      return new HttpException(error.message || 'Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}