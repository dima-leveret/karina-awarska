// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { searchAllImages } from "../../lib/cloudinary";

export default async function handler(req, res) {
  const params = JSON.parse(req.body);
  const results = await searchAllImages(params);
  res.status(200).json({
    ...results,
  });
}
