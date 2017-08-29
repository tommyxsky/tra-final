const mongoose = require('mongoose');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  console.log(req.name);
  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' });
};

exports.createStore = async (req, res) => {
    const store = new Store(req.body);
    await store.save();
    req.flash(
        'success',
        `Successfully Created ${store.name}. Care to leave a review?`
    );
    res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
  const stores = await Store.find();
  res.render('stores', { title: 'Stores', stores });
};

exports.editStore = async (req, res) => {
    // 1. Find the store given the ID
    const _id = req.params.id;
    const store = await Store.findOne({ _id });
    res.render('editStore', { title: `Edit ${store.name}`, store });

    // 2. Confirm they are the owner of the store
    // 3. Render out the edit form so the user can update their store
};
