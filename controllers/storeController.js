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
  const store = await new Store(req.body).save();
  req.flash(
    'success',
    `Successfully Created ${store.name}. Wish to leave a review?`
  );
  res.redirect(`/store/${store.slug}`);
};

exports.getStores = async (req, res) => {
  const stores = await Store.find();
  res.render('stores', {
    title: 'Stores',
    stores
  });
};

exports.getStoreBySlug = async (req, res, next) => {
  const store = await Store.findOne({ slug: req.params.slug });
  if (!store) {
    return next();
  }
  res.render('store', { store, title: store.name });
};

exports.editStore = async (req, res) => {
    // 1. Find the store given the ID
    const _id = req.params.id;
    const store = await Store.findOne({ _id });
    res.render('editStore', { title: `Edit ${store.name}`, store });

    // 2. Confirm they are the owner of the store
    // 3. Render out the edit form so the user can update their store
};

exports.updateStore = async (req, res) => {
  req.body.location.type = 'Point';
    // find and update the store
    const store = await Store.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        {
            new: true, // returns the new store instead of the old one
            runValidators: true
        }
    ).exec();
    // Redirect them to the store and tell them it worked
    req.flash(
        'success',
        `Successfully update <strong>${store.name}</strong>. <a href="/stores/${store.slug}">View Store</a>`
    );
    res.redirect(`/stores/${store._id}/edit`);
};
