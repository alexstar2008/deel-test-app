const { AdminService } = require('./services');
const { AdminRepository } = require('./repositories');

const adminRepository = new AdminRepository();
const adminService = new AdminService({
  adminRepository,
});

class AdminController {
  static async getMostEarnedProfession(req, res) {
    const { start, end } = req.query;

    const profession = await adminService.getMostEarnedProfession(start, end);

    res.json({
      success: true,
      profession,
    });
  }

  static async getMostPaidClients(req, res) {
    const { start, end, limit = 2 } = req.query;

    const clients = await adminService.getMostPaidClients(start, end, limit);

    res.json({
      success: true,
      clients,
    });
  }
}

module.exports = AdminController;
