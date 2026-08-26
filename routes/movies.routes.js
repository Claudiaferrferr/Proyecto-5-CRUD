const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// GET todas las películas
router.get('/', async (req, res) => {
	try {
		const movies = await Movie.find();
		return res.status(200).json(movies);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

// GET por id
router.get('/id/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const movie = await Movie.findById(id);
		if (movie) {
			return res.status(200).json(movie);
		} else {
			return res.status(404).json({ message: 'No movie found by this id' });
		}
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

// GET por título
router.get('/title/:title', async (req, res) => {
	const { title } = req.params;
	try {
		const movieByTitle = await Movie.find({ title });
		return res.status(200).json(movieByTitle);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

// GET por género
router.get('/genre/:genre', async (req, res) => {
	const { genre } = req.params;
	try {
		const movieByGenre = await Movie.find({ genre });
		return res.status(200).json(movieByGenre);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

// GET por año (mayor que)
router.get('/year/:year', async (req, res) => {
	const { year } = req.params;
	try {
		const movieByYear = await Movie.find({ year: { $gt: year } });
		return res.status(200).json(movieByYear);
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

// POST crear película nueva
router.post('/', async (req, res) => {
	try {
		const nuevaMovie = new Movie(req.body);
		const movieGuardada = await nuevaMovie.save();
		return res.status(201).json(movieGuardada);
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
});

// PUT modificar película existente
router.put('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const movieActualizada = await Movie.findByIdAndUpdate(
			id,
			req.body,
			{ new: true, runValidators: true }
		);
		if (movieActualizada) {
			return res.status(200).json(movieActualizada);
		} else {
			return res.status(404).json({ message: 'No movie found by this id' });
		}
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
});

// DELETE eliminar película
router.delete('/:id', async (req, res) => {
	const { id } = req.params;
	try {
		const movieEliminada = await Movie.findByIdAndDelete(id);
		if (movieEliminada) {
			return res.status(200).json({ message: 'Movie deleted successfully', movie: movieEliminada });
		} else {
			return res.status(404).json({ message: 'No movie found by this id' });
		}
	} catch (err) {
		return res.status(500).json({ error: err.message });
	}
});

module.exports = router;