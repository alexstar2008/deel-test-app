const { Profile } = require('../../model');

class BalanceRepository {
  getClientBalance(clientId) {
    return Profile.findOne({
      attributes: ['balance'],
      where: {
        id: clientId,
        type: 'client',
      },
    });
  }

  updateClientBalance(amount, clientId) {
    return Profile.increment('balance', {
      by: amount,
      where: {
        id: clientId,
      },
    });
  }
}

module.exports = BalanceRepository;
