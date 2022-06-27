const { Op } = require('sequelize');
const { CONTRACT_STATUS } = require('../../constants');
const { Job, Contract, Profile, sequelize } = require('../../model');

class JobsRepository {
  getActiveUnpaidJobs(clientId, contractorId) {
    const contractQuery = {
      status: CONTRACT_STATUS.IN_PROGRESS,
    };
    if (clientId) {
      contractQuery.ClientId = clientId;
    }
    if (contractorId) {
      contractQuery.ContractorId = contractorId;
    }
    const jobQuery = {
      where: {
        paid: {
          [Op.not]: true,
        },
      },
      include: {
        attributes: [],
        model: Contract,
        where: contractQuery,
      },
    };
    return Job.findAll(jobQuery);
  }

  async updateJobPaidAndContractorBalance(jobId) {
    await sequelize.transaction(async (t) => {
      const job = await Job.findOne(
        {
          attributes: ['price'],
          where: {
            id: jobId,
            paid: {
              [Op.not]: true,
            },
          },
          include: {
            attributes: ['ClientId', 'ContractorId'],
            model: Contract,
          },
        },
        { transaction: t }
      );

      await Job.update(
        {
          paid: true,
          paymentDate: Date.now(),
        },
        {
          where: { id: jobId },
        },
        { transaction: t }
      );

      await Profile.decrement(
        'balance',
        {
          by: job.price,
          where: { id: job.Contract.ClientId },
        },
        { transaction: t }
      );
      await Profile.increment(
        'balance',
        {
          by: job.price,
          where: { id: job.Contract.ContractorId },
        },
        { transaction: t }
      );
    });
  }

  getClientJobsTotalAmount(clientId, paid) {
    return Job.sum('price', {
      where: {
        paid,
      },
      include: {
        model: Contract,
        where: {
          status: CONTRACT_STATUS.IN_PROGRESS,
          ClientId: clientId,
        },
      },
    });
  }

  getJob(jobId, clientId, paid) {
    return Job.findOne({
      where: {
        id: jobId,
        paid
      },
      include: {
        model: Contract,
        where: {
          ClientId: clientId,
        },
      },
    });
  }
}

module.exports = JobsRepository;
