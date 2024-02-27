import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'


function getFileExtension(fileName: string): string {
  const lastDotIndex = fileName.lastIndexOf('.');
  if (lastDotIndex !== -1) {
    return fileName.slice(lastDotIndex + 1);
  }
  return '';
}

export async function POST(request: NextRequest) {
  const data = await request.formData()
  const file: File | null = data.get('file') as unknown as File
  const name: String | null = data.get('name') as string;

  if (!file) {
    return NextResponse.json({ success: false })
  }
  const fileExtension = getFileExtension(file.name);

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const path = `public/${name}.${fileExtension}`
  await writeFile(path, buffer)

  return NextResponse.json({ success: true })
}