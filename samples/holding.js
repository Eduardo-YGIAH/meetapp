//user
User.hasOne(models.Location, { through: 'UserLocations' });
User.belongsToMany(models.Meet, { through: 'MeetAtendees' });
User.hasMany(models.Meet, { through: 'MeetOrganizers' });

//meets
Meet.hasOne(models.Location, { through: 'MeetLocations' });
Meet.belongsToMany(models.User, { through: 'MeetAtendees' });
Meet.hasOne(models.User, { through: 'MeetOrganizers' });

//locations
Location.hasMany(models.User, { through: 'UserLocations' });
Location.hasMany(models.Meet, { through: 'MeetLocations' });

const jane = await User.create({ name: 'Jane' });
// console.log(jane); // Don't do this
console.log(jane.toJSON()); // This is good!
console.log(JSON.stringify(jane, null, 4)); // This is also good!

const jane = await User.create({ name: 'Jane' });
console.log(jane.name); // "Jane"
jane.name = 'Ada';
// the name is still "Jane" in the database
await jane.save();
// Now the name was updated to "Ada" in the database!

const jane = await User.create({ name: 'Jane' });
console.log(jane.name); // "Jane"
console.log(jane.favoriteColor); // "green"
jane.name = 'Jane II';
jane.favoriteColor = 'blue';
await jane.save({ fields: ['name'] });
console.log(jane.name); // "Jane II"
console.log(jane.favoriteColor); // "blue"
// The above printed blue because the local object has it set to blue, but
// in the database it is still "green":
await jane.reload();
console.log(jane.name); // "Jane II"
console.log(jane.favoriteColor); // "green"
