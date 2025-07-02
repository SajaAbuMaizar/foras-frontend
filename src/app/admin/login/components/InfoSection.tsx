import React from "react";
import { Shield, Activity, Users, BarChart3 } from "lucide-react";

const InfoSection: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-700 to-indigo-800 p-12 items-center justify-center relative">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative z-10 text-white text-center max-w-md">
        <div className="mb-8">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-8 mb-8">
            <Shield className="h-20 w-20 text-white mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">نظام إدارة متقدم</h3>
            <p className="text-lg opacity-90">
              أدوات قوية لإدارة المنصة بكفاءة عالية
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <Activity className="h-8 w-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">99.9%</div>
            <div className="text-sm opacity-80">وقت التشغيل</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <Users className="h-8 w-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">10K+</div>
            <div className="text-sm opacity-80">مستخدم نشط</div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <BarChart3 className="h-8 w-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">500+</div>
            <div className="text-sm opacity-80">تقرير يومي</div>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-3 text-right">
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="w-2 h-2 bg-green-400 rounded-full ml-3"></div>
            <span>إدارة شاملة للمستخدمين والوظائف</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="w-2 h-2 bg-green-400 rounded-full ml-3"></div>
            <span>تقارير مفصلة وإحصائيات دقيقة</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="w-2 h-2 bg-green-400 rounded-full ml-3"></div>
            <span>أدوات متقدمة للمراقبة والتحليل</span>
          </div>
          <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <div className="w-2 h-2 bg-green-400 rounded-full ml-3"></div>
            <span>نظام أمان متطور وحماية البيانات</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
