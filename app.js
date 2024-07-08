const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users'); // Ubah dari './routes/users' ke './routes/user'
const barangRouter = require('./routes/Barang');
const laporanKartuPersediaanRouter = require('./routes/LaporanKartuPersediaan');
const petugasGudangRouter = require('./routes/PetugasGudang');
const transaksiPenjualanRouter = require('./routes/TransaksiPenjualan');
const authRouter = require('./routes/auth');

const app = express();

const sequelize = require('./models/index').sequelize; // Pastikan Anda mengimpor instance Sequelize dengan benar
const { PetugasGudang, Barang, LaporanKartuPersediaan, TransaksiPenjualan } = require('./models/index'); // Pastikan Anda mengimpor model dengan benar

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup
app.use('/', indexRouter);
app.use('/users', usersRouter); // Gunakan usersRouter yang telah diimpor
app.use('/barang', barangRouter);
app.use('/laporankartupersediaan', laporanKartuPersediaanRouter);
app.use('/PetugasGudang', petugasGudangRouter);
app.use('/transaksipenjualan', transaksiPenjualanRouter);
app.use('/auth', authRouter);

const port = process.env.PORT || 3001;

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error JSON response
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
