const User = require('./../Models/userModel');
const Pulse = require('./../Models/joinPulse');

exports.admin = (req, res) => {
  res.render('admin');
};

exports.adminUsers = async (req, res) => {
  try {
    const query = req.query;
    let filter = {
      role: 'student',
    };

    if (query.branch !== undefined && query.branch !== '') {
      filter.branch = query.branch;
    }

    // if (query.description !== undefined && query.description !== '') {
    //   filter.role = query.description;
    // }

    if (query.email !== undefined && query.email !== '') {
      filter.email = query.email;
    }
    console.log('Filter', filter);
    const users = await User.find(filter).select('-password');
    res.render('adminUsers', { users });
  } catch (error) {
    console.log(error);
  }
};

exports.adminEditGet = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const user = await User.findById(id).select('-password');
  console.log(user);
  res.render('userEdit', { user });
};

exports.adminEditPut = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          phone: req.body.phone,
          branch: req.body.branch,
          batch: req.body.batch,
          role: req.body.role,
          blood: req.body.blood,
        },
      },
      { new: true, runValidators: true }
    );
    user.save();
    res.status(200).json({
      status: 'Success',
      message: 'Updated successfully',
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'Failed',
      error: error.message,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const user = await User.findByIdAndDelete(id);
    res.status(200).redirect('/admin/users');
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      error: 'Try again',
    });
  }
};

exports.adminFacultyGet = async (req, res) => {
  try {
    const query = req.query;
    let filter = {
      role: 'faculty',
    };

    // if (query.branch !== undefined && query.branch !== '') {
    //   filter.branch = query.branch;
    // }

    // if (query.description !== undefined && query.description !== '') {
    //   filter.role = query.description;
    // }

    if (query.email !== undefined && query.email !== '') {
      filter.email = query.email;
    }
    console.log('Filter', filter);
    const users = await User.find(filter).select('-password');
    res.render('adminFaculty', { users });
  } catch (error) {
    console.log(error);
  }
};
exports.adminFacultyEditGet = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const user = await User.findById(id).select('-password');
  console.log(user);
  res.render('facultyEdit', { user });
};

// exports.adminPulse = async (req, res) => {
//   const users = await Pulse.find();
//   res.render('adminPulse', { users });
// };

exports.adminPulse = async (req, res) => {
  try {
    const query = req.query;
    let filter = {};

    // if (query.branch !== undefined && query.branch !== '') {
    //   filter.branch = query.branch;
    // }

    if (query.wing !== undefined && query.wing !== '') {
      filter.wing = query.wing;
    }

    if (query.email !== undefined && query.email !== '') {
      filter.email = query.email;
    }
    console.log('Filter', filter);
    const users = await Pulse.find(filter);
    res.render('adminPulse', { users });
  } catch (error) {
    console.log(error);
  }
};

exports.adminBlood = async (req, res) => {
  try {
    const query = req.query;
    let filter = {};

    // if (query.branch !== undefined && query.branch !== '') {
    //   filter.branch = query.branch;
    // }

    if (query.blood !== undefined && query.blood !== '') {
      filter.blood = query.blood;
    }

    if (query.email !== undefined && query.email !== '') {
      filter.email = query.email;
    }
    console.log('Filter', filter);
    const users = await User.find(filter);
    res.render('adminBlood', { users });
  } catch (error) {
    console.log(error);
  }
};

exports.adminLogout = (req, res) => {
  if (req.session.user) {
    req.session.user = undefined;
  } else {
    req.session.user = undefined;
  }
  res.cookie('jwt', '');
  res.redirect('/');
};
