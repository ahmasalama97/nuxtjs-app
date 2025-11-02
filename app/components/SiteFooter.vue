<template>
  <footer class="site-footer">
    <div class="footer-pattern" aria-hidden></div>
    <div class="footer-inner">
      <div class="footer-columns">
        <!-- Summary -->
        <div class="col links">
          <h4>{{ locale === 'ar' ? 'ملخص' : 'Summary' }}</h4>
          <ul>
            <li>{{ locale === 'ar' ? 'حول [اسم البوابة]' : 'About [Portal Name]' }}</li>
            <li>{{ locale === 'ar' ? 'الخصوصية وشروط الاستخدام' : 'Privacy & Terms of Use' }}</li>
            <li>{{ locale === 'ar' ? 'كيفية استخدام [اسم البوابة]' : 'How to Use [Portal Name]' }}</li>
            <li>{{ locale === 'ar' ? 'الأخبار والأحداث' : 'News & Events' }}</li>
            <li>{{ locale === 'ar' ? 'إحصائيات اتفاقية مستوى الخدمة' : 'SLA Statistics' }}</li>
          </ul>
        </div>

        <!-- Important Links -->
        <div class="col links">
          <h4>{{ locale === 'ar' ? 'روابط مهمة' : 'Important Links' }}</h4>
          <ul>
            <li>{{ locale === 'ar' ? 'بوابة الخدمة الوطنية' : 'National Services Portal' }}</li>
            <li>{{ locale === 'ar' ? 'البيانات الحكومية المفتوحة' : 'Government Open Data' }}</li>
            <li>{{ locale === 'ar' ? 'الاستراتيجية الوطنية للبيانات والذكاء الاصطناعي' : 'National Data & AI Strategy'
              }}</li>
            <li>{{ locale === 'ar' ? 'بوابة البيانات المفتوحة' : 'Open Data Portal' }}</li>
            <li>{{ locale === 'ar' ? 'بوابة المشاركة الإلكترونية' : 'e-Participation Portal' }}</li>
          </ul>
        </div>

        <!-- Contact and Support -->
        <div class="col links">
          <h4>{{ locale === 'ar' ? 'الاتصال والدعم' : 'Contact & Support' }}</h4>
          <ul>
            <li>{{ locale === 'ar' ? 'مركز العملاء' : 'Customer Center' }}</li>
            <li>{{ locale === 'ar' ? 'تواصل معنا' : 'Contact Us' }}</li>
            <li>{{ locale === 'ar' ? 'شارك معنا' : 'Participate with Us' }}</li>
            <li>{{ locale === 'ar' ? 'تقديم شكوى' : 'Submit Complaint' }}</li>
            <li>{{ locale === 'ar' ? 'الإبلاغ عن الفساد' : 'Report Corruption' }}</li>
          </ul>
        </div>

        <!-- Social & Accessibility -->
        <div class="col social">
          <h4>{{ locale === 'ar' ? 'تابعنا على' : 'Follow Us On' }}</h4>
          <div class="social-icons">
            <a href="#" aria-label="twitter" class="icon"><i class="mdi mdi-twitter" /></a>
            <a href="#" aria-label="linkedin" class="icon"><i class="mdi mdi-linkedin" /></a>
            <a href="#" aria-label="instagram" class="icon"><i class="mdi mdi-instagram" /></a>
          </div>

          <h4 class="access">{{ locale === 'ar' ? 'أدوات الإتاحة والوصول' : 'Accessibility Tools' }}</h4>
          <div class="access-icons">
            <a href="#" class="icon"><i class="mdi mdi-access-point" /></a>
            <a href="#" class="icon"><i class="mdi mdi-magnify" /></a>
            <a href="#" class="icon"><i class="mdi mdi-eye" /></a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="logos">
          <img src="/images/Logo.png" alt="logo" />
          <img src="/images/footer-logo-1.png" alt="logo" />
        </div>

        <div class="copyright">
          <div class="links-row">
            <a href="#">{{ locale === 'ar' ? 'خريطة الموقع' : 'Site Map' }}</a>
            <a href="#">RSS</a>
            <a href="#">{{ locale === 'ar' ? 'تطبيق الجوال' : 'Mobile App' }}</a>
          </div>
          <div>
            {{ locale === 'ar'
              ? 'جميع الحقوق محفوظة لهيئة الحكومة الرقمية © 2024'
              : 'All rights reserved © Digital Government Authority 2024' }}
          </div>
          <div class="small">
            {{ locale === 'ar'
              ? 'تم تطويره وصيانته بواسطة [أدخل اسم الجهة] | تاريخ آخر تعديل: 04/12/2020'
              : 'Developed and maintained by [Entity Name] | Last updated: 04/12/2020' }}
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">

import { useLocale } from '~/composables/useLocale'
const { locale } = useLocale()
</script>

<style scoped>
.site-footer {
  background: #0b4f3d;
  /* deep green */
  color: #e6f6ef;
  font-family: "Noto Naskh Arabic", "Arial", sans-serif;
}

.footer-pattern {
  height: 70px;
  background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%), linear-gradient(225deg, rgba(255, 255, 255, 0.03) 25%, transparent 25%);
  background-size: 28px 28px;
  background-position: 0 0, 14px 14px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 24px;
}

.footer-columns {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  align-items: start;
}

.footer-columns h4 {
  margin: 0 0 12px 0;
  font-weight: 600;
}

.links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links li {
  padding: 6px 0;
  opacity: 0.95;
}

.links li:hover {
  text-decoration: underline;
}

.social .social-icons,
.social .access-icons {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  color: #e6f6ef;
}

.icon i {
  font-size: 18px;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 28px;
  border-top: 1px solid rgba(255, 255, 255, 0.04);
  padding-top: 18px;
}

.logos img {
  height: 36px;
  margin-right: 12px;
}

.logos img+img {
  margin-left: 8px;
}

.copyright {
  text-align: right;
  line-height: 1.6;
}

.links-row {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-bottom: 6px;
}

.links-row a {
  color: #cfeee0;
  text-decoration: none;
  font-size: 0.95rem;
}

.small {
  color: rgba(230, 246, 239, 0.75);
  font-size: 0.85rem;
  margin-top: 8px;
}

/* Responsive */
@media (max-width: 900px) {
  .footer-columns {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-bottom {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }

  .copyright {
    text-align: left;
  }
}
</style>
