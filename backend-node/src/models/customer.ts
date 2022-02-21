import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import md5 from 'md5'

const prisma = new PrismaClient();

interface InsertUserProps{
    email: string;
    pass: string;
    religion: string;
    ip: string;
    name: string;
    user_type: string;
}
export async function insertUser({
    email, 
    pass, 
    religion,
    ip,
    name,
    user_type
}: InsertUserProps){
    const userExists = await prisma.tbl_usuario.findUnique({
        where: {
            email: email
        }
    });

    if(!userExists){
        const firstName = name.split(' ')[0];

        const { data } = await axios.get(`http://ip-api.com/json/${ip}`);
        const location = `${data.regionName}/${data.city}`

        const user = await prisma.tbl_usuario.create({
            data: { 
                usuario: firstName,
                nome: name,
                religiao: religion,
                email: email,
                senha: md5(pass),
                localizacao: location,
                ip: ip,
                tipo: `${user_type}`,
                FK_id_estatus: 1,
            }
        });

        if(user){
            return {
                'code': 1,
                'msg': 'Usuário Cadastrado Corretamente'
            }
        } else {
            return {
                'code' : 5,
                'msg' : 'Houve um problema na inserção do usuário'
            }
        }
    } else {
        return{
            'code': 6,
            'msg': 'Usuário existente'
        }
    }
}