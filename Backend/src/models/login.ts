import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import md5 from 'md5'

import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

interface LoginProps{
    email: string;
    pass: string
    ip: string;
}

export async function loginUser({ email, pass, ip }: LoginProps) {
    const user = await prisma.tbl_usuario.findUnique({
        where: {
            email: email
        },
        select: {
            usuario: true,
            nome: true,
            religiao: true,
            localizacao: true,
            email: true,
            ip: true,
            tipo: true,
            senha: true
        }
    });

    if(user && md5(pass) === user.senha) {
        if(user.ip === ip){
            const formattedUser = {
                "usuario": user.usuario,
                "nome": user.nome,
                "religiao": user.religiao,
                "localizacao": {
                    "estado": user.localizacao.split('/')[0],
                    "cidade": user.localizacao.split('/')[1]
                },
                "email": user.email,
            }

            const secret = process.env.SECRET_JWT ?? '';
            const token = jwt.sign(formattedUser, secret, {
                expiresIn: 300 // expires in 5min
            });

            if(user.tipo === '1'){
                return{
                    'code'  : 1,
                    'msg'   : 'Conta pessoal',
                    'token' : token
                }
            } else {
                return{
                    'code'  : 2,
                    'msg'   : 'Conta corporativa',
                    'token' : token
                }
            }
        } else {
            return{
                'code': 9,
                'msg' : 'Dispositivo de acesso diferente'
            }
        }
    } else {
        return {
            'code': 5, 
            'msg': 'Usuário ou senha inválidos'
        }
    }
}