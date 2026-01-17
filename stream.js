export default async function handler(req, res) {
  const fileId = req.query.id;
  if (!fileId) return res.status(400).send("Missing file id");

  const BOT_TOKEN = process.env.BOT_TOKEN;

  const tgRes = await fetch(
    `https://api.telegram.org/bot${BOT_TOKEN}/getFile?file_id=${fileId}`
  );
  const tgData = await tgRes.json();

  if (!tgData.ok) return res.status(404).send("File not found");

  const filePath = tgData.result.file_path;
  const fileUrl = `https://api.telegram.org/file/bot${BOT_TOKEN}/${filePath}`;

  res.redirect(fileUrl);
}