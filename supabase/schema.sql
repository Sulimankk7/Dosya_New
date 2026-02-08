-- =============================================
-- Dossier Database - Supabase PostgreSQL Setup
-- Run this in Supabase SQL Editor
-- =============================================

-- Drop existing tables if needed (removes old data)
DROP TABLE IF EXISTS "Orders" CASCADE;
DROP TABLE IF EXISTS "Students" CASCADE;
DROP TABLE IF EXISTS "Courses" CASCADE;
DROP TABLE IF EXISTS "Universities" CASCADE;
DROP TABLE IF EXISTS "DeliveryMethods" CASCADE;
DROP TABLE IF EXISTS "OrderStatuses" CASCADE;

-- 1. Universities
CREATE TABLE "Universities" (
    "UniversityID" SERIAL PRIMARY KEY,
    "UniversityName" TEXT NOT NULL,
    "IsActive" BOOLEAN NOT NULL DEFAULT TRUE
);

-- 2. Courses
CREATE TABLE "Courses" (
    "CourseID" SERIAL PRIMARY KEY,
    "CourseName" TEXT NOT NULL,
    "Description" TEXT,
    "Price" NUMERIC(18, 2) NOT NULL DEFAULT 0,
    "IsActive" BOOLEAN NOT NULL DEFAULT TRUE,
    "UniversityID" INTEGER NOT NULL,
    CONSTRAINT "FK_Courses_Universities" FOREIGN KEY ("UniversityID")
        REFERENCES "Universities" ("UniversityID") ON DELETE CASCADE
);

-- 3. DeliveryMethods
CREATE TABLE "DeliveryMethods" (
    "DeliveryMethodID" SERIAL PRIMARY KEY,
    "MethodName" TEXT NOT NULL,
    "Description" TEXT
);

-- 4. OrderStatuses
CREATE TABLE "OrderStatuses" (
    "StatusID" SERIAL PRIMARY KEY,
    "StatusName" TEXT NOT NULL
);

-- 5. Students
CREATE TABLE "Students" (
    "StudentID" SERIAL PRIMARY KEY,
    "FullName" TEXT NOT NULL,
    "PhoneNumber" TEXT NOT NULL,
    "CreatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- 6. Orders
CREATE TABLE "Orders" (
    "OrderID" SERIAL PRIMARY KEY,
    "Quantity" INTEGER NOT NULL DEFAULT 1,
    "StudentID" INTEGER NOT NULL,
    "UniversityID" INTEGER NOT NULL,
    "CourseID" INTEGER NOT NULL,
    "DeliveryMethodID" INTEGER NOT NULL,
    "StatusID" INTEGER NOT NULL DEFAULT 1,
    "OrderDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    "Notes" TEXT,
    CONSTRAINT "FK_Orders_Students" FOREIGN KEY ("StudentID")
        REFERENCES "Students" ("StudentID") ON DELETE CASCADE,
    CONSTRAINT "FK_Orders_Universities" FOREIGN KEY ("UniversityID")
        REFERENCES "Universities" ("UniversityID") ON DELETE NO ACTION,
    CONSTRAINT "FK_Orders_Courses" FOREIGN KEY ("CourseID")
        REFERENCES "Courses" ("CourseID") ON DELETE NO ACTION,
    CONSTRAINT "FK_Orders_DeliveryMethods" FOREIGN KEY ("DeliveryMethodID")
        REFERENCES "DeliveryMethods" ("DeliveryMethodID") ON DELETE NO ACTION,
    CONSTRAINT "FK_Orders_OrderStatuses" FOREIGN KEY ("StatusID")
        REFERENCES "OrderStatuses" ("StatusID") ON DELETE NO ACTION
);

-- =============================================
-- Seed Data (Your actual data)
-- =============================================

-- Universities (IDs 9, 10, 11)
INSERT INTO "Universities" ("UniversityID", "UniversityName", "IsActive") VALUES
    (9, 'جامعة جدارا', TRUE),
    (10, 'جامعة عجلون الوطنية', TRUE),
    (11, 'جامعة إربد الأهلية', TRUE);

-- Reset sequence
SELECT setval('"Universities_UniversityID_seq"', 11);

-- Courses (Your exact data)
INSERT INTO "Courses" ("CourseID", "CourseName", "Description", "IsActive", "UniversityID", "Price") VALUES
    -- جامعة جدارا (9)
    (6, 'برمجة 1', 'مقدمة للغة البرمجة بلغة C++', TRUE, 9, 5.00),
    (7, 'برمجة 2', 'Functions, Arrays, Strings, OOP', TRUE, 9, 5.00),
    (8, 'تراكيب البيانات', 'شرح واضح لمفاهيم Data Structures', TRUE, 9, 6.00),
    (9, 'بنك أسئلة تراكيب البيانات', 'مجموعة شاملة من الأسئلة الامتحانية مع الحلول', TRUE, 9, 1.00),
    (10, 'بنك أسئلة برمجة', 'أسئلة امتحانية متنوعة تغطي مواد البرمجة مع الحل', TRUE, 9, 1.00),
    -- جامعة عجلون الوطنية (10)
    (11, 'C++', 'مقدمة للغة البرمجة بلغة C++', TRUE, 10, 5.00),
    (12, 'بنك أسئلة برمجة', 'أسئلة امتحانية متنوعة تغطي مواد البرمجة مع الحل', TRUE, 10, 1.00),
    -- جامعة إربد الأهلية (11)
    (13, 'C++', 'مقدمة للغة البرمجة بلغة C++', TRUE, 11, 5.00),
    (14, 'برمجة بلغة مختارة', 'Functions, Arrays, Strings, OOP', TRUE, 11, 5.00),
    (15, 'تراكيب البيانات', 'شرح واضح لمفاهيم Data Structures', TRUE, 11, 6.00),
    (16, 'بنك أسئلة تراكيب البيانات', 'مجموعة شاملة من الأسئلة الامتحانية مع الحلول', TRUE, 11, 1.00),
    (17, 'بنك أسئلة برمجة', 'أسئلة امتحانية متنوعة تغطي مواد البرمجة مع الحل', TRUE, 11, 1.00);

-- Reset sequence
SELECT setval('"Courses_CourseID_seq"', 17);

-- Order Statuses
INSERT INTO "OrderStatuses" ("StatusID", "StatusName") VALUES
    (1, 'قيد الانتظار'),
    (2, 'قيد المعالجة'),
    (3, 'تم التسليم'),
    (4, 'ملغي');

SELECT setval('"OrderStatuses_StatusID_seq"', 4);

-- Delivery Methods (Your data)
INSERT INTO "DeliveryMethods" ("DeliveryMethodID", "MethodName", "Description") VALUES
    (1, 'PDF نسخة إلكترونية', NULL),
    (2, 'توصيل للجامعة', NULL),
    (3, 'توصيل للمنزل', NULL);

SELECT setval('"DeliveryMethods_DeliveryMethodID_seq"', 3);

-- =============================================
-- Indexes for performance
-- =============================================
CREATE INDEX "IX_Courses_UniversityID" ON "Courses" ("UniversityID");
CREATE INDEX "IX_Orders_StudentID" ON "Orders" ("StudentID");
CREATE INDEX "IX_Orders_UniversityID" ON "Orders" ("UniversityID");
CREATE INDEX "IX_Orders_CourseID" ON "Orders" ("CourseID");
CREATE INDEX "IX_Orders_StatusID" ON "Orders" ("StatusID");
CREATE INDEX "IX_Orders_DeliveryMethodID" ON "Orders" ("DeliveryMethodID");
CREATE INDEX "IX_Orders_OrderDate" ON "Orders" ("OrderDate" DESC);

-- =============================================
-- Row Level Security (RLS)
-- =============================================
ALTER TABLE "Universities" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Courses" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "OrderStatuses" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "DeliveryMethods" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Students" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Orders" ENABLE ROW LEVEL SECURITY;

-- Public read access for reference tables
CREATE POLICY "Public read Universities" ON "Universities" FOR SELECT USING (true);
CREATE POLICY "Public read Courses" ON "Courses" FOR SELECT USING (true);
CREATE POLICY "Public read OrderStatuses" ON "OrderStatuses" FOR SELECT USING (true);
CREATE POLICY "Public read DeliveryMethods" ON "DeliveryMethods" FOR SELECT USING (true);

-- Students: Anyone can insert
CREATE POLICY "Anyone can create Students" ON "Students" FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can read Students" ON "Students" FOR SELECT USING (auth.role() = 'authenticated');

-- Orders: Anyone can insert
CREATE POLICY "Anyone can create Orders" ON "Orders" FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can read Orders" ON "Orders" FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Authenticated users can update Orders" ON "Orders" FOR UPDATE USING (auth.role() = 'authenticated');
