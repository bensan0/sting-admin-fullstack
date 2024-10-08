'use strict'

import crypto from 'crypto'
import strRandom from 'string-random'
import jwt from 'jsonwebtoken'

export const Util = {
    genPassword: () => {
        let salt = strRandom(16)
        let rawPass = strRandom(10)

        const md5 = crypto.createHash('md5')
        let hashedPass = md5.update(rawPass + salt).digest('hex')

        return {
            salt: salt,
            rawPass: rawPass,
            hashedPass: hashedPass
        }
    },

    checkPassword: (input, password, salt) => {
        const md5 = crypto.createHash('md5')

        return md5.update(input + salt).digest('hex') === password
    },

    genToken: (id, username) => {
        const payload = {
            id: id,
            username: username 
        }

        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 86400})
    }
}