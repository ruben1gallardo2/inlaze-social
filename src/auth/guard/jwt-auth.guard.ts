import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  //podemos usar canactivate para proteger las rtas de acuerdo a perfiles de  usuario
  //por ahora, es suficiente con agregar la estrategia y este guard en las rutas necesarias
}