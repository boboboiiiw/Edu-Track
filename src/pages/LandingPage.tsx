import { useNavigate } from "react-router-dom";
import Layout from "../components/layout/Layout";
import ButtonWithIcon from "../components/ButtonWithIcon";
import { BsRocketTakeoff } from "react-icons/bs";
import statistics from "../assets/images/statistics.jpg";
import writing from "../assets/images/writing.jpg";
import discuss from "../assets/images/discuss.jpg";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="w-full">
        <section className="flex flex-col items-center text-center py-20 px-6">
          <h2 className="text-4xl font-extrabold mb-4 max-w-3xl leading-snug">
            Kelola & Pantau Progres Belajarmu dengan Mudah di Era Digital
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mb-8">
            EduTrack membantu mahasiswa mencatat aktivitas belajar dan memberi
            akses bagi dosen untuk memantau perkembangan akademik secara
            real-time
          </p>
          <ButtonWithIcon
            onClick={() => navigate("/register")}
            icon={<BsRocketTakeoff />}
            variant="secondary"
          >
            Ayo Mulai
          </ButtonWithIcon>
        </section>

        {/* Highlight Features */}
        <section id="features" className="bg-white py-16 px-6">
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            {/* Fitur 1 */}
            <div className="flex flex-col items-center">
              <img
                src={writing}
                alt="Catat Aktivitas"
                className="h-64 mb-4 rounded-xl drop-shadow-xl object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Catat Aktivitas</h3>
              <p className="text-gray-600">
                Simpan dan kelola progres belajarmu setiap hari dengan mudah dan
                rapi.
              </p>
            </div>

            {/* Fitur 2 */}
            <div className="flex flex-col items-center">
              <img
                src={discuss}
                alt="Komentar & Umpan Balik"
                className="h-64 mb-4 rounded-xl drop-shadow-xl object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Komentar & Umpan Balik</h3>
              <p className="text-gray-600">
                Diskusikan materi dan terima komentar dari dosen maupun
                mahasiswa lain.
              </p>
            </div>

            {/* Fitur 3 */}
            <div className="flex flex-col items-center">
              <img
                src={statistics}
                alt="Visualisasi Progres"
                className="h-64 mb-4 rounded-xl drop-shadow-xl object-cover"
              />
              <h3 className="text-xl font-bold mb-2">Visualisasi Progres</h3>
              <p className="text-gray-600">
                Pantau performa akademik lewat grafik yang informatif dan
                menarik.
              </p>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="bg-blue-50 py-16 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Kenapa EduTrack?</h3>
            <p className="text-gray-700 text-lg">
              EduTrack lahir dari kebutuhan untuk menciptakan ekosistem
              pembelajaran daring yang transparan, kolaboratif, dan terstruktur
              — membantu mahasiswa lebih disiplin dan memudahkan dosen dalam
              monitoring akademik secara digital.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default LandingPage;
