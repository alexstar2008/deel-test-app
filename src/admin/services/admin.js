class AdminService {
  constructor(repositories) {
    this.adminRepository = repositories.adminRepository;
  }

  getMostEarnedProfession(startDate, endDate) {
    return this.adminRepository.getMostEarnedProfession(startDate, endDate);
  }

  getMostPaidClients(startDate, endDate, limit) {
    return this.adminRepository.getMostPaidClients(startDate, endDate, limit);
  }
}

module.exports = AdminService;
