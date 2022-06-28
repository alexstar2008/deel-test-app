const { Profile } = require('../model');
const { UnauthorizedError } = require('../errors');

const getProfile = async (req, res, next) => {
  const profile = await Profile.findOne({ where: { id: req.get('profile_id') || 0 } });
  if (!profile) {
    throw new UnauthorizedError('No provided authorization header');
  }
  const profileBasicData = {};
  if (profile.type === 'contractor') {
    profileBasicData.contractorId = profile.id;
  }
  if (profile.type === 'client') {
    profileBasicData.clientId = profile.id;
  }
  req.profile = profileBasicData;
  next();
};
module.exports = { getProfile };
