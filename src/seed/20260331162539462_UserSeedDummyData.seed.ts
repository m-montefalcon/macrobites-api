import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from '../modules/users/schema/user.schema';
import bcrypt from 'bcryptjs';

export async function runUserSeedDummyData() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const userModel = app.get<Model<UserDocument>>(getModelToken('User'));

  const hashedPassword = await bcrypt.hash('password123', 10);

  const userData = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: hashedPassword,
    bio: 'I am a test user',
    avatar: 'https://i.pravatar.cc/150?img=1',
  };

  const existing = await userModel.findOne({ email: userData.email });
  if (!existing) {
    const user = await userModel.create(userData);
    console.log('✅ User created:', user);
  } else {
    console.log('ℹ️ User already exists. Skipping UserSeedDummyData Seeder');
  }

  await app.close();
}
