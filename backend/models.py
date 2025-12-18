from sqlalchemy import Boolean, Column, Integer, String, Text

from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=False)


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(100), unique=True, nullable=False, index=True)
    title = Column(String(255), nullable=False)
    short_description = Column(Text, nullable=False)
    task_number = Column(Integer, nullable=False)
    theory_block = Column(Text, nullable=False)
    methodology_block = Column(Text, nullable=False)
    data_block = Column(Text, nullable=False)
    results_block = Column(Text, nullable=False)
    conclusion_block = Column(Text, nullable=False)
    links_block = Column(Text, nullable=False)
