import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

// ✅ READ - Obtener todos los usuarios (solo admin)
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ READ - Obtener usuario por ID
export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ✅ UPDATE - Actualizar usuario (nombre, email, contraseña)
export const updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        if (username) user.username = username;
        if (email) user.email = email;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();
        res.json({ message: 'Usuario actualizado correctamente', user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// ✅ DELETE - Eliminar usuario
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        await user.deleteOne();
        res.json({ message: 'Usuario eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
