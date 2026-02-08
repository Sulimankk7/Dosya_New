export type Database = {
    public: {
        Tables: {
            Universities: {
                Row: {
                    UniversityID: number;
                    UniversityName: string;
                    DeliveryFee: number;
                    IsActive: boolean;
                };
                Insert: {
                    UniversityID?: number;
                    UniversityName: string;
                    DeliveryFee?: number;
                    IsActive?: boolean;
                };
                Update: {
                    UniversityID?: number;
                    UniversityName?: string;
                    DeliveryFee?: number;
                    IsActive?: boolean;
                };
            };
            Courses: {
                Row: {
                    CourseID: number;
                    CourseName: string;
                    Description: string | null;
                    Price: number;
                    IsActive: boolean;
                    UniversityID: number;
                };
                Insert: {
                    CourseID?: number;
                    CourseName: string;
                    Description?: string | null;
                    Price: number;
                    IsActive?: boolean;
                    UniversityID: number;
                };
                Update: {
                    CourseID?: number;
                    CourseName?: string;
                    Description?: string | null;
                    Price?: number;
                    IsActive?: boolean;
                    UniversityID?: number;
                };
            };
            DeliveryMethods: {
                Row: {
                    DeliveryMethodID: number;
                    MethodName: string;
                    Description: string | null;
                };
                Insert: {
                    DeliveryMethodID?: number;
                    MethodName: string;
                    Description?: string | null;
                };
                Update: {
                    DeliveryMethodID?: number;
                    MethodName?: string;
                    Description?: string | null;
                };
            };
            OrderStatuses: {
                Row: {
                    StatusID: number;
                    StatusName: string;
                };
                Insert: {
                    StatusID?: number;
                    StatusName: string;
                };
                Update: {
                    StatusID?: number;
                    StatusName?: string;
                };
            };
            Students: {
                Row: {
                    StudentID: number;
                    FullName: string;
                    PhoneNumber: string;
                    CreatedAt: string;
                };
                Insert: {
                    StudentID?: number;
                    FullName: string;
                    PhoneNumber: string;
                    CreatedAt?: string;
                };
                Update: {
                    StudentID?: number;
                    FullName?: string;
                    PhoneNumber?: string;
                    CreatedAt?: string;
                };
            };
            Orders: {
                Row: {
                    OrderID: number;
                    Quantity: number;
                    StudentID: number;
                    UniversityID: number;
                    CourseID: number;
                    DeliveryMethodID: number;
                    StatusID: number;
                    OrderDate: string;
                    Notes: string | null;
                };
                Insert: {
                    OrderID?: number;
                    Quantity?: number;
                    StudentID: number;
                    UniversityID: number;
                    CourseID: number;
                    DeliveryMethodID: number;
                    StatusID?: number;
                    OrderDate?: string;
                    Notes?: string | null;
                };
                Update: {
                    OrderID?: number;
                    Quantity?: number;
                    StudentID?: number;
                    UniversityID?: number;
                    CourseID?: number;
                    DeliveryMethodID?: number;
                    StatusID?: number;
                    OrderDate?: string;
                    Notes?: string | null;
                };
            };
        };
    };
};

// Helper types for easier usage
export type University = Database['public']['Tables']['Universities']['Row'];
export type Course = Database['public']['Tables']['Courses']['Row'];
export type DeliveryMethod = Database['public']['Tables']['DeliveryMethods']['Row'];
export type OrderStatus = Database['public']['Tables']['OrderStatuses']['Row'];
export type Student = Database['public']['Tables']['Students']['Row'];
export type Order = Database['public']['Tables']['Orders']['Row'];
export type OrderInsert = Database['public']['Tables']['Orders']['Insert'];
export type StudentInsert = Database['public']['Tables']['Students']['Insert'];

// Extended order type with joined data (for admin panel)
export type OrderWithDetails = Order & {
    Students: Student;
    Universities: University;
    Courses: Course;
    OrderStatuses: OrderStatus;
};
