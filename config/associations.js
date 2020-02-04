const User = require('../models').User;
const Meet = require('../models').Meet;
const Location = require('../models').Location;

//user
const UserBelongsToLocation = User.belongsTo(Location, { targetKey: 'id', foreignKey: 'userLocationId' });
const UserBelongsToManyMeets = User.belongsToMany(Meet, {
  through: 'UserMeetAtendee',
  sourceKey: 'id',
  targetKey: 'id',
});
const UserHasManyMeets = User.hasMany(Meet, { sourceKey: 'id', foreignKey: 'meetUserOrganizerId' });

//meets
const MeetBelongsToLocation = Meet.belongsTo(Location, { targetKey: 'id', foreignKey: 'meetLocationId' });
const MeetBelongsToManyUsers = Meet.belongsToMany(User, {
  through: 'UserMeetAtendee',
  sourceKey: 'id',
  targetKey: 'id',
});
const MeetBelongsToUser = Meet.belongsTo(User, { targetKey: 'id', foreignKey: 'meetUserOrganizerId' });

//locations
const LocationHasManyUsers = Location.hasMany(User, { sourceKey: 'id', foreignKey: 'userLocationId' });
const LocationHasManyMeets = Location.hasMany(Meet, { sourceKey: 'id', foreignKey: 'meetLocationId' });

module.exports = {
  UserBelongsToLocation,
  UserBelongsToManyMeets,
  UserHasManyMeets,
  MeetBelongsToLocation,
  MeetBelongsToManyUsers,
  MeetBelongsToUser,
  LocationHasManyUsers,
  LocationHasManyMeets,
};

User.belongsTo(Location, { targetKey: 'id', foreignKey: 'UserLocationId' });
// This creates a foreign key called `UserLocationId` in the source model (User)
// which references the `id` field from the target model (Location).
//Now we can do things like:
(async () => {
  try {
    await Location.create({ town: 'Birmingham', id: 1 });
    const user = await User.create({ name: 'Black Pearl', UserLocationId: 1 });
    console.log((await user.getLocation()).town); // "Birmingham"
  } catch (err) {
    console.error(err);
  }
})();
