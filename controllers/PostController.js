import PostModel from "../models/Post.js";

export const create = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      city: req.body.city,
      images: req.body.images,
      features: req.body.features,
      tags: req.body.tags,
      bargain: req.body.bargain,
      user: req.userId,
    });

    const post = await doc.save();

    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Не удалось создать статью",
    });
  }
};
export const getAll = async (req, res) => {
  try {
    const posts = await PostModel.find({ isModerated: true })
      .limit(req.query.limit)
      .populate("city")
      .exec();
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить статьи" });
  }
};
export const getOne = async (req, res) => {
  try {
    const post = await PostModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: "after",
      }
    )
      .populate("city")
      .populate("user")
      .exec();

    if (!post) {
      return res.status(404).json({ message: "Статья не найдена" });
    }
    let additionalData = {};
    if (req.isAdmin | (req.userId == post.user._id)) {
      additionalData = { canDelete: true };
    }
    if (req.isAdmin & (post.isModerated === false)) {
      additionalData = { ...additionalData, canModerate: true };
    }
    res.json({
      ...post._doc,
      ...additionalData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить статью" });
  }
};
export const getCount = async (req, res) => {
  try {
    const count = await PostModel.countDocuments({ isModerated: true });
    if (!count) {
      return res.status(404).json({ message: "Статьи не найдены" });
    }
    res.json(count);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить статьи" });
  }
};
export const getByCategory = async (req, res) => {
  try {
    const posts = await PostModel.find({
      tags: req.params.category,
      isModerated: true,
    })
      .populate("city")

      .limit(req.query.limit);
    if (!posts) {
      return res.status(404).json({ message: "Статьи не найдены" });
    }
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить статьи" });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const posts = await PostModel.find({
      user: req.userId,
      isModerated: true,
    })
      .populate("city")
      .exec();
    if (!posts) {
      res.status(404).json({ message: "Статьи не найдены" });
    }
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось получить статьи" });
  }
};
export const remove = async (req, res) => {
  try {
    const doc = await PostModel.findOneAndDelete({ _id: req.params.id });

    if (!doc) {
      return res.status(404).json({ message: "Статья не найдена" });
    }

    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось удалить статью" });
  }
};
export const update = async (req, res) => {
  try {
    await PostModel.updateOne(
      { _id: "665b501d8b106a353ed8d956" },
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        city: req.body.city,
        images: req.body.images,
        features: req.body.features,
        tags: req.body.tags,
        bargain: req.body.bargain,
        user: req.userId,
      }
    );
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Не удалось обновить статью" });
  }
};
