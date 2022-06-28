const { AdminService } = require('./services');
const { AdminRepository } = require('./repositories');

const adminRepository = new AdminRepository();
const adminService = new AdminService({
  adminRepository,
});

class AdminController {
  static async getMostEarnedProfession(req, res, next) {
    try {
      const { start, end } = req.query;

      const profession = await adminService.getMostEarnedProfession(start, end);

      res.json({
        success: true,
        profession,
      });
    } catch (e) {
      next(e);
    }
  }

  static async getMostPaidClients(req, res, next) {
    try {
      const { start, end, limit = 2 } = req.query;

      const clients = await adminService.getMostPaidClients(start, end, limit);

      res.json({
        success: true,
        clients,
      });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = AdminController;
