/*
 * Copyright (c) 2014-2022 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { Request, Response, NextFunction } from 'express'
import { WalletModel } from '../models/wallet'
import { CardModel } from '../models/card'

module.exports.getWalletBalance = function getWalletBalance () {
  return async (req: Request, res: Response, next: NextFunction) => {
    const wallet = await WalletModel.findOne({ where: { UserId: req.body.UserId } })
    if (wallet) {
      res.status(200).json({ status: 'success', data: wallet.balance })
    } else {
      res.status(404).json({ status: 'error' })
    }
  }
}

module.exports.addWalletBalance = function addWalletBalance () {
  return async (req: Request, res: Response, next: NextFunction) => {
    const cardId = req.body.paymentId
    const card = cardId ? await CardModel.findOne({ where: { id: cardId, UserId: req.body.UserId } }) : null
    if (card) {
      const wallet = await WalletModel.increment({ balance: req.body.balance }, { where: { UserId: req.body.UserId } })
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const wallet_balance = await WalletModel.findOne({ where: { UserId: req.body.UserId } })

      if (wallet && wallet_balance) {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        res.status(200).json({ status: 'success', data: wallet_balance.balance })
      } else {
        res.status(404).json({ status: 'error' })
      }
    } else {
      res.status(402).json({ status: 'error', message: 'Payment not accepted.' })
    }
  }
}
