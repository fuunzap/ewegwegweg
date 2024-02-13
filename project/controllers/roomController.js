const Room = require('../models/room');

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json(rooms);
  } catch (error) {
    console.error('Ошибка при получении списка авторов:', error);
    res.status(500).json({ error: 'Ошибка при получении списка авторов' });
  }
};

const createRoom = async (req, res) => {
  try {
    const newRoom = await Room.create(req.body);
    res.status(201).json(newRoom);
  } catch (error) {
    console.error('Ошибка при создании автора:', error);
    res.status(500).json({ error: 'Ошибка при создании автора' });
  }
};

const updateRoom = async (req, res) => {
  const roomId = req.params.id;
  try {
    const [updatedRowsCount] = await Room.update(req.body, {
      where: { id: roomId },
    });
    if (updatedRowsCount === 0) {
      return res.status(404).json({ error: 'Автор не найден' });
    }
    res.status(200).json({ message: 'Автор успешно обновлен' });
  } catch (error) {
    console.error('Ошибка при обновлении автора:', error);
    res.status(500).json({ error: 'Ошибка при обновлении автора' });
  }
};

const deleteRoom = async (req, res) => {
  const roomId = req.params.id;
  try {
    const deletedRowCount = await Room.destroy({
      where: { id: roomId },
    });
    if (deletedRowCount === 0) {
      return res.status(404).json({ error: 'Автор не найден' });
    }
    res.status(200).json({ message: 'Автор успешно удален' });
  } catch (error) {
    console.error('Ошибка при удалении автора:', error);
    res.status(500).json({ error: 'Ошибка при удалении автора' });
  }
};

module.exports = {
  getAllRooms,
  createRoom,
  updateRoom,
  deleteRoom,
};