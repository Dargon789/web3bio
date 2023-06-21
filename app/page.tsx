"use client";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchInput from "../components/profile/SearchInput";
import { handleSearchPlatform, isDomainSearch } from "../utils/utils";
import SearchResultDomain from "../components/search/SearchResultDomain";
import SearchResultQuery from "../components/search/SearchResultQuery";
import { Footer } from "../components/shared/Footer";
import Image from "next/image";
export default function HomePage() {
  const [searchFocus, setSearchFocus] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPlatform, setsearchPlatform] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [profileData, setProfileData] = useState({});
  const router = useRouter();
  const handleSubmit = (value, platform?) => {
    setSearchTerm(value);
    router.push("/", {
      query: platform
        ? {
            s: value,
            platform: platform,
          }
        : {
            s: value,
          },
    });
    setsearchPlatform(platform || handleSearchPlatform(value));
    setSearchFocus(true);
  };
  const handleOpenProfileModal = (identity, platform, profile) => {
    setProfileData({
      identity,
      platform,
      profile,
    });

    window.history.pushState({}, "", `/${identity}`);
    setModalOpen(true);
  };
  return (
    <div>
      <NextSeo
        title={
          searchTerm
            ? `${searchTerm} - Web3.bio`
            : "Web3.bio - Web3 Identity Graph Search and Link-in-bio Profile Service"
        }
      />
      <div className="web3bio-container">
        <div className="web3bio-cover flare"></div>

        <div
          className={searchFocus ? "web3bio-search focused" : "web3bio-search"}
        >
          <div className="container grid-xs">
            <div className="search-form">
              <Link
                href={{
                  pathname: "/",
                  query: {},
                }}
              >
                <div className="web3bio-logo" title="Web3.bio">
                  <h1 className="text-pride">
                    WEB3
                    <br />
                    BIO
                  </h1>
                </div>
              </Link>
              <div className="form-label">
                Web3 <span>Identity Search</span>
              </div>
              <div className="form-input-group">
                <SearchInput
                  // add key here to make defaultValue reactive
                  key={searchTerm}
                  defaultValue={searchTerm}
                  handleSubmit={(value, platform) => {
                    handleSubmit(value, platform);
                  }}
                />
              </div>
            </div>
            {/* {searchPlatform ? (
              isDomainSearch(searchPlatform) ? (
                <SearchResultDomain
                  onItemClick={handleOpenProfileModal}
                  searchTerm={searchTerm}
                  searchPlatform={searchPlatform}
                />
              ) : (
                <SearchResultQuery
                  onItemClick={handleOpenProfileModal}
                  searchTerm={searchTerm}
                  searchPlatform={searchPlatform}
                />
              )
            ) : null} */}
          </div>
        </div>
      </div>
      <div className="web3bio-footer">
        <div className="container grid-lg">
          <div className="columns mt-2 mb-2">
            <div className="column col-4 col-sm-12 mt-2 mb-2">
              <div className="card-feature">
                <div className="feature-header text-center">
                  <h3>Identity Search Support</h3>
                  <h4>
                    Search for Web3 identities with these{" "}
                    <strong>domains and accounts</strong>.
                  </h4>
                </div>

                <div className="feature-body feature-body-first text-center">
                  <div
                    className="identity identity-ens"
                    title="ENS domains (.eth)"
                  >
                    <Image
                      alt="ens"
                      src="icons/icon-ens.svg"
                      width={20}
                      height={20}
                      className="icon mr-1"
                    />{" "}
                    Ethereum Name Service
                  </div>
                  <div
                    className="identity identity-farcaster"
                    title="Farcaster identities"
                  >
                    <Image
                      alt="far"
                      src="icons/icon-farcaster.svg"
                      width={20}
                      height={20}
                      className="icon mr-1"
                    />{" "}
                    Farcaster
                  </div>
                  <div
                    className="identity identity-lens"
                    title="Lens identities (.lens)"
                  >
                    <Image
                      alt="lens"
                      src="icons/icon-lens.svg"
                      width={20}
                      height={20}
                      className="icon mr-1"
                    />
                    Lens
                  </div>
                  <div
                    className="identity identity-unstoppabledomains"
                    title="Unstoppable Domains"
                  >
                    <Image
                      alt="ud"
                      src="icons/icon-unstoppabledomains.svg"
                      width={20}
                      height={20}
                      className="icon mr-1"
                    />
                    Unstoppable Domains
                  </div>
                  <div
                    className="identity identity-spaceid"
                    title="SPACE ID domains"
                  >
                    <Image
                      alt="spaceid"
                      src="icons/icon-spaceid.svg"
                      width={20}
                      height={20}
                      className="icon mr-1"
                    />{" "}
                    SPACE ID
                  </div>
                </div>
              </div>
            </div>
            <div className="column col-4 col-sm-12 mt-2 mb-2">
              <div className="card-feature">
                <div className="feature-header text-center">
                  <h3>Visualize Identity Graph</h3>
                  <h4>
                    Deep dive into Web3 identities and connections across
                    digital space.
                  </h4>
                </div>
                <div className="feature-body feature-body-graph text-center">
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="circle"></div>
                  <div className="btn">
                    <Image
                      alt="view"
                      src={"/icons/icon-view.svg"}
                      width={24}
                      height={24}
                      className="icon mr-1"
                    />{" "}
                    Visualize
                  </div>
                </div>
              </div>
            </div>
            <div className="column col-4 col-sm-12 mt-2 mb-2">
              <div className="card-feature">
                <div className="feature-header text-center">
                  <h3>Your Web3 Profile </h3>
                  <h4>
                    One page to show who you are and everything you make and
                    own.
                  </h4>
                  <a
                    className="text-small label mb-4"
                    href="https://web3.bio/vitalik.eth"
                    target="_blank"
                  >
                    web3.bio/
                    <span className="text-small label label-primary ml-1">
                      vitalik.eth
                    </span>
                  </a>
                </div>
                <div className="feature-body feature-body-profile text-center">
                  <div className="demo-profile">
                    <div className="avatar avatar-lg avatar-1">🦄</div>
                  </div>
                  <div className="demo-profile">
                    <div className="avatar avatar-lg avatar-2">👨‍🌾</div>
                  </div>
                  <div className="demo-profile">
                    <div className="avatar avatar-lg avatar-3">👩‍🎨</div>
                  </div>
                  <div className="demo-profile">
                    <div className="avatar avatar-lg avatar-4">🧑‍🚀</div>
                  </div>
                  <div className="demo-profile">
                    <div className="avatar avatar-lg avatar-5">🐳</div>
                  </div>
                  <div className="demo-profile">
                    <div className="avatar avatar-lg avatar-6">🦸‍♂️</div>
                  </div>
                  <div className="demo-profile">
                    <div className="avatar avatar-lg avatar-7">👨‍💻</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center container grid-lg">
          <div className="columns">
            <div className="column col-12">
              <Footer />
            </div>
          </div>
        </div>
      </div>
      {/* {modalOpen && (
        <DynamicProfileModal
          onClose={() => {
            window.history.go(-1);
            setModalOpen(false);
          }}
          profile={profileData}
        />
      )} */}
    </div>
  );
}
